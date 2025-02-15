const TxList = ({ txs }) => {
  if (txs.length === 0) return null;

  return (
    <>
      {txs((item) => (
        <div key={item} className="alert alert-info mt-5">
          <div className="flex-1">
            <label>{item.hash}</label>
          </div>
        </div>
      ))}
    </>
  );
}
export default TxList;