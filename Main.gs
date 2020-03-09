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
 * シート1行分のデータから、送信するメッセージを作成する
 *
 * @param {array} 送信対象の行データ
 *
 * @return {string} 作成したメッセージ
 */
const createLyricMessage_ = function(rowValues) {

  let   m  = '';
  const CODE_BLOCK  = '```' + '\n';
  const BLOCK_QUATE = '>>> ';
  const rowData     = {
    lyrics     :rowValues[0],
    title      :rowValues[1],
    singer     :rowValues[2],
    lyricWriter:rowValues[3],
    songWriter :rowValues[4],
    arranger   :rowValues[5],
    isSongLyric:rowValues[6],
    youtubeUrl :rowValues[7],
    introducer :rowValues[8],
    lyricUrl   :rowValues[9],
  };
  
  // 共通部分
  m = 'お元気ですか？' + '\n';
  m += 'ちょっとこれ読んで休憩しましょ！:shushing_face:' + '\n';
  m += CODE_BLOCK;
  m += rowData.lyrics + '\n';
  m += CODE_BLOCK;

  // 歌詞
  if (rowValues[6] === true) {
    m += rowData.title + ' - ' + rowData.singer + '\n';

    m += BLOCK_QUATE;
    m += '作詞：' + rowData.lyricWriter + '\n';
    m += '作曲：' + rowData.songWriter  + '\n';
    m += '編曲：' + rowData.arranger    + '\n';

    // YouTubeのURLが無ければ以下飛ばす
    if (!rowData.youtubeUrl) return m;

    m += '\n';
    m += '▼Youtube' + '\n';
    m += rowData.youtubeUrl;

  // 歌詞以外
  } else {
    m += rowData.title + ' - ' + rowData.lyricWriter + '\n';

    m += BLOCK_QUATE;
    m += '▼参考URL' + '\n';
    m += rowData.lyricUrl;
  }

  return m;
};