export class ParserService {

  parseVideo(data: any) {
    if (!data || !data.videoRenderer) return;
    let title = ''
    let description = ''
    try{
        title = data.videoRenderer.title.runs[0].text;
        title = title.replace("\\\\", "\\");
      try{
        title = decodeURIComponent(title);
      }catch (e) {
        // @ts-ignore
      }

      try {
        data.videoRenderer.detailedMetadataSnippets[0].snippetText.runs.forEach((item: any) => description += item.text)
      } catch (e) {}

      return {
        id: {
          videoId: data.videoRenderer.videoId
        },
        url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
        author: data.videoRenderer.ownerText.runs[0].text,
        title,
        description,
        duration_raw: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
        snippet: {
          url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
          duration: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
          publishedAt: data.videoRenderer.publishedTimeText ? data.videoRenderer.publishedTimeText.simpleText : null,
          thumbnails: {
            id: data.videoRenderer.videoId,
            url: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].url,
            default: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
            high: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
            height: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].height,
            width: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].width
          },
          title,
          views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
        },
        views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
      };
    }catch (e){
      return undefined
    }
  }
}