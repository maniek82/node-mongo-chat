 var socket = io();
 
 function scrollToBottom() {
   //Selectors
   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');
   //Heights
   var clientHeight = messages.prop('clientHeight');
   console.log("clientHeight" +clientHeight);
   
   var scrollTop = messages.prop('scrollTop');
   console.log('scrollTop' + scrollTop);
   var scrollHeight = messages.prop('scrollHeight');
   console.log('scrollHeight'+scrollHeight);
   var newMessageHeight = newMessage.innerHeight();
   console.log('newMessageHeight'+ newMessageHeight);
   var lastMessageHeight = newMessage.prev().innerHeight();
   console.log('lastMessageHeight'+ lastMessageHeight);
   
   if(clientHeight+ scrollTop +newMessageHeight+lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
   }
     
 }
 
   socket.on('connect', function(){
     var params = jQuery.deparam(window.location.search);
     socket.emit('join',params,function(err) {
         if(err) {
           alert(err);
           window.location.href = '/';
         }else {
          console.log('No error');
         }
     });
     
     
   });
   
   
   socket.on('disconnect',function() {
     console.log('disconnected from server');
   });
   //UPDATE PEOPLE LIST
   socket.on('updateUserList',function(users) {
      var ol = jQuery('<ol></ol>');
      if(users){
        users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
        jQuery('#users').html(ol);
      });
      }
     
   });
   
   
   socket.on('newMessage',function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
     var template = jQuery('#message-template').html();
     var html = Mustache.render(template,{
       text: message.text,
       from: message.from,
       createdAt: formattedTime
     });
     jQuery('#messages').append(html);
       scrollToBottom();
       // var li = jQuery('<li></li>');
       // li.text(`${message.from}: ${formattedTIme}:  ${message.text}`);
       // jQuery('#messages').append(li);
       
   });
   socket.on('newLocationMessage',function(message) {
   var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
       // var li = jQuery('<li></li>');
       // var a = jQuery('<a target="_blank">My current location</a>');
       // li.text(`${message.from} ${formattedTIme}: `);
       // a.attr('href', message.url);
       // li.append(a);
       // jQuery('#messages').append(li);
    
   });
   
  /*global jQuery*/
 jQuery('#message-form').on('submit',function(e) {
   e.preventDefault();
   
   var messageTextbox = jQuery('[name=message]');
   socket.emit('createMessage',{
    text: messageTextbox.val()
   }, function() {
     messageTextbox.val('');
   });
 });
   
 var locationButton = jQuery('#send-location');
 locationButton.on('click', function() {
  if(!navigator.geolocation) {
   return alert('Geolacation not supported by your broweer')
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
   locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
     latitude: position.coords.latitude,
     longitude: position.coords.longitude
     
    });
  }, function() {
   locationButton.removeAttr('disabled').text('Send location');
   alert('Unable to fetch leocation.');
  });
 });
//SEARCH FORM

 jQuery('#search-user').on('submit',function(e) {
   e.preventDefault();
   
   var userSearch = jQuery('[name=user]');
   socket.emit('searchByUser',{
    text: userSearch.val()
   }, function() {
     userSearch.val('romek');
   });
 });
   
   socket.on('newFounded',function(messages) {
      var ul = jQuery('<ul></ul>');
      if(messages){
        messages.forEach(function(message){
        ul.append(jQuery('<li></li>').text(message));
        jQuery('#searched-messages').html(ul);
      });
      }
     
   });