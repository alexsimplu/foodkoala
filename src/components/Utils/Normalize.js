const normalize = name => {
    let imageRef = name.split(' ').map(name => name.toLowerCase()).join('-')
    imageRef = imageRef.substring(
        0, imageRef[imageRef.length - 1] === '-' ? imageRef.length - 1 : imageRef.length
    )
    return imageRef
}

export default normalize;