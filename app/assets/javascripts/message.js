$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="main-chat__message-list__message" data-message-id=${message.id}>
          <div class="main-chat__message-list__message__info">
            <div class="main-chat__message-list__message__info--name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message__info--time">
              ${message.time}
            </div>
          </div>
          <div class="main-chat__message-list__message__lower-message">
            <p class="main-chat__message-list__message__lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-chat__message-list__message" data-message-id=${message.id}>
          <div class="main-chat__message-list__message__info">
            <div class="main-chat__message-list__message__info--name">
              ${message.user_name}
            </div>
            <div class="main-chat__message-list__message__info--time">
              ${message.time}
            </div>
          </div>
          <div class="main-chat__message-list__message__lower-message">
            <p class="main-chat__message-list__message__lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
$('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.main-chat__message-list').append(html);
       $('form')[0].reset();
       $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
     })
     .always(function(data){
       $('.main-chat__message-send__send-btn').prop('disabled', false);
     })
     .fail(function() {
       alert("メッセージ送信に失敗しました");
     });
})
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__message-list__message:last').data("message-id");
    //カスタムデータ属性でブラウザに表示されている最新メッセー時IDを取得
    $.ajax({
      url: "api/messages",
      //ルーティングで設定した/groups/id番号/api/messagesへ
      type: 'get',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      dataType: 'json',
      data: {id: last_message_id}
      //dataオプションでリクエストに値を含める
    })
    .done(function(messages) {
      //更新留守メッセージがない場合に条件分岐するようにifでフォームの中身を空にして再送信する処理
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main-chat__message-list').append(insertHTML);
      //スクロールを行うためのanimate関数、非同期通信が成功した場合に起動させるため最後に記述
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  //.matchは引数に正規表現を取り、メソッドを利用した文字列にその正規表現とマッチする部分があれば、それを含む配列を返り値にする
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});