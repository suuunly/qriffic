
export type DownloadOptions = {
  fileName: string;
  mimeType: string;
  id: string;
}

export function useDownload(options: DownloadOptions) {

  const download = (): boolean => {
    const target = document.getElementById(options.id) as HTMLCanvasElement | null;

    if (!target) {
      console.error(`Could not find canvas element with id ${options.id} to download.`);
      return false;
    }

    const pngUrl = target
      .toDataURL(options.mimeType)
      .replace(options.mimeType, "image/octet-stream");

    let downloadLink = document.createElement("a");

    downloadLink.href = pngUrl;
    downloadLink.download = options.fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink)
    
    return true;
  };

  return download
}