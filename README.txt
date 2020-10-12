Setup Instructions.
--Clone the project from github url https://github.com/darshanmehta88987/Toddle or
--Extract the zip folder. Open command prompt type command "npm install" to install all the dependencies.
--Import a db.sql file in your mysql database give your database name as "survey".

1) To authenticate a user use :-
http://localhost:3000/authenticate/
U will get a token put it in header authorization as a key and its value as a token u received for the next subsequent requests.

2) To create a survey use :-
http://localhost:3000/survey/create
In body pass username 
U will get a survey_id which will help u to add question in the survey.

3) To add a question in survey use :-
http://localhost:3000/survey/addQuestion
In body pass question, option1, option2 and survey_id

4) To take a survey use :-
http://localhost:3000/survey/take/{survey_id}
where survey_id can be the id of the survey you wish to take

5) To submit a survey use :-
http://localhost:3000/survey/submit
In body pass survey_id,question,option1,option2,username,selected_option

6) To view the result of the survey use :-
http://localhost:3000/survey/result/{survey_id}
where survey_id can be id of the survey you wish to view the result
 
	

	