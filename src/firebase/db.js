import { db } from './firebase';

export const doCreateUser = (id, username, email, SCORE) =>
  db.ref(`users/${id}`).set({
    username,
    email,
		SCORE,
		GAMES: [],
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

export const getGames = () => 
	db.ref('/flamelink/environments/production/content/games/en-US').once('value')

export const getGame = (uid) => {
		return db.ref(`/flamelink/environments/production/content/games/en-US/${uid}`).once('value')
}

export const setGameUser = (gameID, userID) => {
	db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {

			let gameUsers = snapshot.val().gameUsers

			if(!gameUsers)
				return db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).child('gameUsers').push( userID )

			Object.keys(gameUsers).map(key => {
					if(!gameUsers[key] == userID) {
						db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).child('gameUsers').push( userID )
					}
			})
		})
}

// export const setGameUserScore = (uid, updatedScore, holeNumber, updatedTotalScore) => {
// 	db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
// 		.then(snapshot => {

// 		})
// }