export async function images() {

    const imageList = await fetch(`http://localhost:5000/api/v1/images`);
    return imageList.json();
}