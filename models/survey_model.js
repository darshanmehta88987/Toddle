var db=require('../database_connection');
var survey={
    create_survey:function(item,callback){
        return db.query('insert into create_survey(username) values (?)',[item.username],callback);
    },
    add_question:function(item,callback){
        return db.query('insert into survey_questions(survey_id,question,option1,option2) values (?,?,?,?)',[item.survey_id,item.question,item.option1,item.option2],callback);
    },
    take_survey:function(id,callback){
        return db.query('select question,option1,option2 from survey_questions where survey_id=?',[id],callback);
    },
    submit_survey:function(item,callback){
        return db.query('insert into survey_answers(survey_id,question,option1,option2,username,selected_option) values(?,?,?,?,?,?)',[item.survey_id,item.question,item.option1,item.option2,item.username,item.selected_option],callback);
    },
    result_survey:function(id,callback){
        return db.query('select question,option1,option2,username,selected_option from survey_answers where survey_id=? order by question',[id],callback);
    }
};
module.exports=survey;
//survey_id username
//survey_id question option1 option2
