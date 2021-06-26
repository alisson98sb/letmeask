import { useEffect, useState } from "react"
import { database } from "../services/firebase"
import { useAuth } from "./useAuth";

type firebaseQuestionsParams = Record<string, {
	author: {
		name: string,
		avatar: string
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likes: Record<string, {
		authorId: string;
	}>
}>

type QuestionParams = {
	id: string;
	author: {
		name: string,
		avatar: string
	}
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	likeCount: number;
	likeId: string | undefined;
}


export function useRoom(roomId: string){
	const { user } = useAuth();
    const [questions, setQuestions ] = useState<QuestionParams[]>([])
	const [title, setTitle] = useState('')

	useEffect(()=>{
		
		const roomRef = database.ref(`rooms/${roomId}`);
		roomRef.on('value', room => {
			const databaseRoom = room.val();
			const fireabaseQuestions : firebaseQuestionsParams = databaseRoom.questions  ?? {};
			const parsedQuestions = Object.entries(fireabaseQuestions).map(([key, value]) =>{
				return {
					id: key,
					content: value.content,
					author: value.author,
					isHighlighted: value.isHighlighted,
					isAnswered: value.isAnswered,
					likeCount: Object.values(value.likes ?? {}).length,
					likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
				}
			})
			setTitle(databaseRoom.title)
			setQuestions(parsedQuestions)
		})

		return () => {
			roomRef.off('value'); 		//obs. "on" e "off" são funções exclusivas do Firebase
		}

	},[roomId, user?.id])

    return {questions, title}

}