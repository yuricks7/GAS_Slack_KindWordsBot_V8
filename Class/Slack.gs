/**
 * 投稿先の設定
 * [note] あらかじめプロジェクトにSlackAppライブラリを導入しておくこと！
 *
 * クラス全体で外部ライブラリを使用
 * [Name]    SlackApp
 * [Key]     M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO
 * [version] 22
 *
 * @param {string} 投稿先のチャンネル名
 * @param {string} 投稿に表示するユーザー名
 */
const Slack = function(channelName, displayUserName) {
  this.channelName     = channelName;
  this.displayUserName = displayUserName;
}

/**
 * メッセージをSlackに投稿する
 *
 * @param {string} 作成したSlackメッセージ
 */
Slack.prototype.post = function(message) {
  if (!message) {
    const message = '「メッセージが空欄」でーす';
  }
  
  const accessToken = PropertiesService
    .getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

 //SlackAppインスタンスの取得
  const slackApp = SlackApp.create(accessToken);

  slackApp.postMessage(
    this.channelName,
    message,
    {username: this.displayUserName}
  );
};