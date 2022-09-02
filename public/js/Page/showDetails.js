async function createWindow(link){
    window.open(link);
}

export async function openNewPage(link, data, src) {
    await createWindow(link);
    document.getElementById("gallary").value = [data, src];
}