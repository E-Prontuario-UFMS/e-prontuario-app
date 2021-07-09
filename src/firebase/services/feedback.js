import { FEEDBACK } from "../../constants";
import { db } from "../../firebase";

export async function sendFeedback(feedback) {
  await db.collection(FEEDBACK).add(feedback);
}
