import { db } from './firebase';
import { messagesDB } from './messages'
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

export const changeUserName = (uid, name) => {
	db.ref(`/users/${uid}`).update({
		username: name
	})
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
	for (let index = 0; index < 9; index++) {
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
				return db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userID}`).set( { userID, SCORE } )

			db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userID}`).once('value')
				.then(snapshot => {
					// Check if User Exists
					if(!snapshot.val()) {
						db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userID}`).set( { userID, SCORE } )
					}
				})

			return
		})

	return
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

export const getGamePlayerScore = (gameID, userID) => {

	let userScore = ''

	let score = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
		.then(snapshot => {
			let gameUsers = snapshot.val().gameUsers
			if(!gameUsers)
				return 

			userScore = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}/gameUsers/${userID}`).once('value')
				.then(snapshot => {
					let user = snapshot.val()

					if(!user) 
						return

					// Check if User Exists
					if(user) {
						return user.SCORE
					}
				})

			return userScore
		})

	return score
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

export const getGameSpecialRules = (gameID) => {
	let specialRules = db.ref(`/flamelink/environments/production/content/games/en-US/${gameID}`).once('value')
	.then(snapshot => {
			let gameSpecialRules = snapshot.val().gameSpecialRules
			if(!gameSpecialRules)
				return 

			return gameSpecialRules
	})
	
	return specialRules
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

export const addGameMessage = (gameID, username, message) => {
	const data = {
		content: message,
		username: username,
		timestamp: Date.now()
	}

	console.log(data)

	//messagesDB.collection('messages').doc(gameID.toString()).set(data)
	messagesDB.collection(gameID.toString()).add(data)
		.then(function() {
			console.log("Document successfully written!");
		})
}

export const getGameChat = (gameID) => {
	return messagesDB.collection(gameID.toString())
		.orderBy('timestamp')
}
