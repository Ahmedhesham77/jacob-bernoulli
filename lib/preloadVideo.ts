export function preloadVideo(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video")
        video.src = src
        video.muted = true
        video.playsInline = true
        video.preload = "auto"

        const onReady = () => {
            cleanup()
            resolve()
        }

        const onError = () => {
            cleanup()
            reject()
        }

        const cleanup = () => {
            video.removeEventListener("loadeddata", onReady)
            video.removeEventListener("error", onError)
        }

        video.addEventListener("loadeddata", onReady)
        video.addEventListener("error", onError)
    })
}
