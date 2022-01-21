import Statement from ".";

import { TokenTypes } from "../../../constants/bhaiLangSpec";
import { NodeType } from "../../../constants/constants";
import StatementList from "../statementList";
import TokenExecutor from "../tokenExecutor";

export default class BlockStatement extends Statement {
  _statementList: StatementList;

  constructor(tokenExecutor: TokenExecutor, statementList: StatementList) {
    super(tokenExecutor);
    this._statementList = statementList;
  }

  getStatement() {
    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.OPEN_CURLY_BRACE_TYPE
    );

    const body =
      this._tokenExecutor.getLookahead()?.type ===
      TokenTypes.CLOSED_CURLY_BRACE_TYPE
        ? []
        : this._statementList.getStatementList(
            TokenTypes.CLOSED_CURLY_BRACE_TYPE
          );

    this._tokenExecutor.eatTokenAndForwardLookahead(
      TokenTypes.CLOSED_CURLY_BRACE_TYPE
    );

    return {
      type: NodeType.BlockStatement,
      body,
    };
  }
}