import { db } from './firebase';
import { async } from '@firebase/util';

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

	const currentScore = []
	for (let index = 0; index < 18; index++) {
		currentScore.push({ score: 0 })
	}
	const SCORE = {
			currentScore,
			totalScore: 0
	}

	db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {

			let gameUsers = snapshot.val().gameUsers

			if(!gameUsers)
				return db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).child('gameUsers').push( { userID, SCORE } )

			Object.keys(gameUsers).map(key => {
					if(!gameUsers[key].userID == userID) {
						db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).child('gameUsers').push( { userID, SCORE } )
					}
			})
		})
}

export const getGameUsers = (gameID) => {
	let users = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {
				let gameUsers = snapshot.val().gameUsers
				if(!gameUsers)
					return 

				return gameUsers
		})
		
	return users
}

export const getGamePlayerScore = async (gameID, userID) => {
	let score = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {
			let gameUsers = snapshot.val().gameUsers
			if(!gameUsers)
				return 

				Object.keys(gameUsers).map(key => {
					if(gameUsers[key].userID == userID) {
						//console.log(gameUsers[key])
						return score = gameUsers[key].SCORE
					}
				})

				return score
		})

		return await score
}

export const setGamePlayerScore = async (userID, gameID, updatedScore, holeNumber, updatedTotalScore) => {
	db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {
				let gameUsers = snapshot.val().gameUsers
				if(!gameUsers)
					return 

				Object.keys(gameUsers).map((key, index) => {
					if(gameUsers[key].userID == userID) {
						let userKey = Object.keys(gameUsers)[index]
						db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userKey}/SCORE/currentScore/${holeNumber}`).set({
							score: (parseInt(updatedScore, 10) || 0)
						}).then(() => {
							db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userKey}/SCORE/`).update({totalScore: updatedTotalScore})
						})
						db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userKey}/SCORE/`).update({totalScore: updatedTotalScore})
					}
				})

			return snapshot
		})
}

export const getGameRules = (gameID) => {
	let rules = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
	.then(snapshot => {
			let gameRules = snapshot.val().gameRules
			if(!gameRules)
				return 

			return gameRules
	})
	
	return rules
}

export const getGameHoleNumber = (gameID) => {
	let number = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
	.then(snapshot => {
			let gameHoleNumber = snapshot.val().gameHoleNumber
			if(!gameHoleNumber)
				return 

			return gameHoleNumber
	})
	
	return number
}