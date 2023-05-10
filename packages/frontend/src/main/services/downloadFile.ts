const useDownload = () => {

    const _download = async (
        contentType: string,
        base64Data: string,
        fileName: string
      ) => {
        const linkSource = `data:${contentType};base64,${base64Data}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        downloadLink.remove();
    }

    return {
        download: _download
    }
}

export default useDownload