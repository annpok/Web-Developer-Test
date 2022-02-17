
const readRecordById = async (db, name, query) => {
  let res;
  try {
    res = await db.collection(name).findOne(query);
  }
  catch (err) {
    res = {'error':'An error has occurred'};
  }
  return res;
}

const updateRecordById = async (db, name, query, item) => {
  let res;
  try {
    res = await db.collection(name).updateOne(query, { $set: item });
  }
  catch (err){
    res = {'error':`An error has occurred err=${err}`};
  }
  return res;
}

const deleteRecordById = async (db, name, query) => {
  let res;
  try {
    res = await db.collection(name).remove(query);
  }
  catch (err){
    res = {'error':`An error has occurred err=${err}`};
  }
  return res;
}

const findRecords = async (db, name, query={}) => {
  let res;
  try {
    res = await db.collection(name).find(query);
  }
  catch {
    res = {'error':`An error has occurred err=${err}`};
  }
  return res;
}

export { readRecordById, updateRecordById, deleteRecordById, findRecords };