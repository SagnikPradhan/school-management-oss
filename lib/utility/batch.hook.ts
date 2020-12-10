import { useEffect, useRef, useState } from "react";
import firebase from "lib/utility/firebase";

/**
 * Batch hook, interfaces with firestore in batches
 * Helps reduce reads and writes
 * @param collectionName - Name of the collection
 */
export function useBatch<D extends firebase.firestore.DocumentData>(
  collectionName: string,
  filter?: (
    collection: firebase.firestore.CollectionReference<D>
  ) => firebase.firestore.Query<D>
) {
  const firestore = firebase.firestore();
  const collection = firestore.collection(
    collectionName
  ) as firebase.firestore.CollectionReference<D>;

  const batch = useRef(firestore.batch());
  const [proxyData, setProxyData] = useState<D[]>([]);
  const [changesToBeCommitted, setChangesToBeCommitted] = useState(false);

  useEffect(refreshData, []);

  /**
   * Refresh data, updates data to match stored on firestore
   */
  function refreshData() {
    const query = filter ? filter(collection) : collection;

    query
      .get()
      .then((snapshot) => snapshot.docs)
      .then((docs) => docs.map((doc) => doc.data()))
      .then((data) => setProxyData(data))
      .catch(console.error);
  }

  /**
   * Add new data
   * @param id - Id of the document
   * @param data - Data of the document
   */
  function addFn(id: string, data: D) {
    setProxyData([...proxyData, data]);
    batch.current.set(collection.doc(id), data);
    setChangesToBeCommitted(true);
  }

  /**
   * Delete data
   * @param id - Id of the data
   * @param data - Filter document
   */
  function deleteFn(id: string, data: Partial<D>) {
    setProxyData(proxyData.filter((d) => d !== data));
    batch.current.delete(collection.doc(id));
    setChangesToBeCommitted(true);
  }

  /**
   * Commit all the changes and refresh the database
   */
  function commitFn() {
    return batch.current.commit();
  }

  /**
   * Reset
   */
  function resetFn() {
    batch.current = firestore.batch();
    refreshData();
    setChangesToBeCommitted(false);
  }

  /**
   * Commit and reset
   */
  function commitAndResetFn() {
    commitFn().then(resetFn).catch(console.error);
  }

  return {
    data: proxyData,
    add: addFn,
    delete: deleteFn,
    reset: resetFn,
    commitAndReset: commitAndResetFn,
    refresh: refreshData,
    changesToBeCommitted,
  };
}
