export type PollResponse = {

  participantId: String,

  /**
   * ID of the parent Poll of this answer
   */
  pollId: String,

  /**
   * An array of boolean: true if the answer was chosen by the responder, else false
   */
  answer: Array<String>
};

export type Poll = {

  creatorParticipantId: string,

  /**
   * ID of the parent Poll of this answer
   */
  pollId: String,

  /**
   * Title of the Poll
   */
  title: String,

  /**
   * Title of the Poll
   */
  options: Map<String, Array<String>>,

  allowCustomizedAnswer: Boolean,

  /**
   * An array of boolean: true if the answer was chosen by the responder, else false
   */
  // votes: Array<PollResponse>
};
