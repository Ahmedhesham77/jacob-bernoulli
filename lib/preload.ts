export function preloadImages(srcs: string[]): Promise<void[]> {
    return Promise.all(
        srcs.map(
            src =>
                new Promise<void>(resolve => {
                    const img = new Image()
                    img.src = src
                    img.onload = () => resolve()
                    img.onerror = () => resolve()
                })
        )
    )
}
