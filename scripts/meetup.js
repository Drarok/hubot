// Description:
//   meetup script
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//   when is the next event ?  - returns the next upcoming meetup event

module.exports = function(robot) {
  var multipleEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_id=17778422%2C12345482%2C18829161%2C18789928%2C18617250&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=secure&page=20&fields=&order=time&status=upcoming&desc=false&sig_id=153356042&sig=f5a37aa0b09d2a1a48f8e82d5e194fd2494a409c";
  var jsOxfordEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_id=17778422&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=secure&page=20&fields=&order=time&desc=false&status=upcoming&sig_id=153356042&sig=84e9ac6ce37bdb3c00e4f82fe5a7ce798865fbe4";
  var uxOxfordEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=UX-Oxford&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=secure&page=20&fields=&order=time&status=upcoming&desc=false&sig_id=153356042&sig=04a4edfbcbab17f591a8ad208da4b02bf364e24c";
  var phpOxfordEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=PHP-Oxford&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=public&page=20&fields=&order=time&status=upcoming&desc=false&sig_id=153356042&sig=2893753701aa73225565fc154a447ced1d0b20bb";
  var dockerEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=docker-oxford&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=public&page=20&fields=&order=time&status=upcoming&desc=false&sig_id=153356042&sig=691ed0980f6543572bb425f7d1675e911e592553";
  var rubyEvents = "https://api.meetup.com/2/events?offset=0&format=json&limited_events=False&group_urlname=Oxford-Ruby-Users-Group-OxRUG&only=time%2Cevent_url%2Cname%2Cdescription%2Cyes_rsvp_count%2Crsvp_limit&photo-host=public&page=20&fields=&order=time&status=upcoming&desc=false&sig_id=153356042&sig=28283c85246a091d9cc0dff99aac1c1bbd2941a5";
  var result;

  robot.hear(/when(s|'s| is) the next (.*)(meetup|event)\s?\?/i, function(msg){
    var room = msg.message.room;
    var community = msg.match[1];
    var meetupURL = multipleEvents;

    if(!community) {
      if(room.toLowerCase().indexOf('jsox')) {
        meetupURL = jsOxfordEvents;
      } else if(room.toLowerCase().indexOf('ux')) {
        meetupURL = uxOxfordEvents;
      } else if(room.toLowerCase().indexOf('php')) {
        meetupURL = phpOxfordEvents;
      } else if(room.toLowerCase().indexOf('docker')) {
        meetupURL = dockerEvents;
      } else if(room.toLowerCase().indexOf('ruby')) {
        meetupURL = rubyEvents;
      }
    } else {
      if(community.toLowerCase().indexOf('jsox')) {
        meetupURL = jsOxfordEvents;
      } else if(community.toLowerCase().indexOf('ux')) {
        meetupURL = uxOxfordEvents;
      } else if(community.toLowerCase().indexOf('php')) {
        meetupURL = phpOxfordEvents;
      } else if(community.toLowerCase().indexOf('docker')) {
        meetupURL = dockerEvents;
      } else if(community.toLowerCase().indexOf('ruby')) {
        meetupURL = rubyEvents;
      }
    }

    robot.http(meetupURL).get()(function(err, res, body){
      if(err) console.log(err);
      result = JSON.parse(body).results;
      if(result && result.length > 0){
        msg.send(result[0].event_url);
      }else{
        msg.send("No upcoming events planned");
      }
    });

  });
}
