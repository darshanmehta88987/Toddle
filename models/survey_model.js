var db=require('../database_connection');
var survey={
    create_survey:function(item,callback){
        return db.query('insert into create_survey(username) values (?)',[item.username],callback);
    },
    add_question:function(item,callback){
        return db.query('insert into survey_questions(survey_id,question,option1,option2) values (?,?,?,?)',[item.survey_id,item.question,item.option1,item.option2],callback);
    }
};
module.exports=survey;
//survey_id username
//survey_id question option1 option2
