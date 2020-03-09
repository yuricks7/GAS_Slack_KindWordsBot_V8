/**
 * 「'Phrase'」シートに入力した言葉をランダムでSlackに送信する
 */
function PostKindWordsBot() {
  const ss          = SpreadsheetApp.getActiveSpreadsheet();
  const phraseSheet = ss.getSheetByName('Phrase');

  // ランダムに送信対象を設定
  const FIRST_DATA_ROW = 2;
  const lastRow   = phraseSheet.getLastRow();
  const targetRow = Math.floor(Math.random() * (lastRow - 1) + FIRST_DATA_ROW);

  const values  = phraseSheet.getRange(targetRow, 1, 1, 10).getValues();
  const message = createLyricMessage_(values[0]);

  const SlackBot = new Slack('00_kind-words-bot', '優しいことばBot');
  SlackBot.post(message);
}

/**
 * 行データから送信するメッセージを作成する
 *
 * @param {array} 送信対象の行データ
 * @return {string} 作成したメッセージ
 */
const createLyricMessage_ = function(rowValues) {
  let   m  = '';

  if (rowValues[6] === true) {
    m = 'お元気ですか？' + '\n';
    m += 'ちょっとこれ読んで休憩しましょ！:shushing_face:' + '\n';
    m += '```' + '\n';
    m += rowValues[0] + '\n';
    m += '```' + '\n';
    m += rowValues[1] + ' - ' + rowValues[2] + '\n';
    m += '>>> '
    m += '作詞：' + rowValues[3] + '\n';
    m += '作曲：' + rowValues[4] + '\n';
    m += '編曲：' + rowValues[5] + '\n';

    // YouTubeのURLが無ければ以下飛ばす
    if (!rowValues[7]) return m;

    m += '\n';
    m += '▼Youtube' + '\n';
    m += rowValues[7];

  } else {
    m = 'お元気ですか？' + '\n';
    m += 'ちょっとこれ読んで休憩しましょ！:shushing_face:' + '\n';
    m += '```' + '\n';
    m += rowValues[0] + '\n';
    m += '```'+ '\n';
    m += rowValues[1] + ' - ' + rowValues[3] + '\n';
    m += '>>> ';
    m += '▼参考URL' + '\n';
    m += rowValues[9];
  }

  return m;
};