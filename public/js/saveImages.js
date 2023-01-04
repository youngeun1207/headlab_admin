export async function generateZIP(id, links) {
    var zip = new JSZip();
    var zipFilename = `${id}.zip`;
    for(let i = 0; i < links.length; i++){
        var filename = links[i];
        // loading a file and add it in a zip file
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if (err) {
                throw err; // or handle the error
            }
            zip.file(filename, data, { binary: true });
        })
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
        saveAs(content, zipFilename);
    });
}