$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="main-chat__message-list__box">
         <div class="main-chat__message-list__box__data">
           <div class="main-chat__message-list__box__data__talker">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__box__data__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__box__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="main-chat__message-list__box">
         <div class="main-chat__message-list__box__data">
           <div class="main-chat__message-list__box__data__talker">
             ${message.user_name}
           </div>
           <div class="main-chat__message-list__box__data__date">
             ${message.created_at}
           </div>
         </div>
         <div class="main-chat__message-list__box__text">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
  $('.main-chat__form__box').on('submit', function(e){
  
   e.preventDefault()
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
      $('input').prop('disabled', false);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
         $('form')[0].reset();
    })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
});