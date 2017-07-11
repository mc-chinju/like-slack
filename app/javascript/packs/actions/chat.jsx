/* Actionsの実装 */

// Action名の定義
const SEND = 'SEND';

// Action Creators
export default function send(value) {
  // Action
  return {
    type: SEND,
    value,
  };
}
