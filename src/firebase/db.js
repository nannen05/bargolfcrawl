import { db } from './firebase';

export const doCreateUser = (id, username, email, SCORE) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    SCORE
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const getCurrentUser = (uid) => {
	return db.ref('users/' + uid)
}

export const setScore = (uid, updatedScore, holeNumber, updatedTotalScore) => {
	//db.ref('/users/' + uid + '/SCORE/').update({totalScore: updatedTotalScore})
	db.ref('/users/' + uid + '/SCORE/courseScore/' + holeNumber).set({
		score: (parseInt(updatedScore, 10) || 0)
	}).then(() => {
		db.ref('/users/' + uid + '/SCORE/').update({totalScore: updatedTotalScore})
	})
  db.ref('/users/' + uid + '/SCORE/').update({totalScore: updatedTotalScore})

}

export const getPlayerScore = (uid, updatedTotalScore) => {
	db.ref('/users/' + uid + '/SCORE/').update({totalScore: updatedTotalScore})
}

export const getCourseRules = () => 
	db.ref('/flamelink/environments/production/content/courseRules/en-US').once('value')

export const addGame = (uid, courseRules) => {
	db.ref('/users/' + uid + '/GAMES/').push(courseRules)
}
