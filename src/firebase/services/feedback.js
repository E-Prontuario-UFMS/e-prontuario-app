import { FEEDBACK } from "../../constants";
import { db } from "../../firebase";

export async function sendFeedback(feedback) {
  return await db
    .collection(FEEDBACK)
    .add(feedback)
    .then(data => data)
    .catch(err => Error(err));
}
