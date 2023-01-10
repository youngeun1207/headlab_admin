import { createWindow } from "./Page/showDetails.js";

export async function handlePrevClick() {
    const link = "./prev.html";
    await createWindow(link);
}