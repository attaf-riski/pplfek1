import DataOperator from "../inteface/OperatorInterface";

const GetOperator = (): DataOperator | null => {
  const OperatorString = localStorage.getItem("ps");

  if (OperatorString) {
    const Operator: DataOperator = JSON.parse(OperatorString);

    return Operator;
  }

  return null;
};
const SetOperator = (data: DataOperator) => {
  const OperatorString = JSON.stringify(data);

  localStorage.setItem("ps", OperatorString);
};

const RemoveOperator = () => {
  const OperatorString = localStorage.getItem("ps");
  if (OperatorString) {
    localStorage.removeItem("ps");
  }
};

export default { GetOperator, SetOperator, RemoveOperator };
