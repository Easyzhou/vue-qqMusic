/**
 * Created by Administrator on 2017/9/6 0006.
 */
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

//创建一个工厂函数
export function createSongs(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

//格式化歌手姓名
function filterSinger(singer) {
  let ret = []
  if(!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })

  return ret.join('/')
}
