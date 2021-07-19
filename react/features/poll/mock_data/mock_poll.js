import { Poll } from "../models";

export const new_poll = {
  creatorParticipantId: "123456",
  pollId: "1",
  title: "Who am I?",
  options: { "Allen": 0, "Ansh": 0 },
  allowCustomizedAnswer: false
}


export const poll_with_answers = {
  creatorParticipantId: "123456",
  pollId: "1",
  title: "Who am I?",
  options: { "Allen": ["123"], "Ansh": [] },
  allowCustomizedAnswer: false
}
