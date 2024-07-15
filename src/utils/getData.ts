export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log("There is an error while fetching the data", error);
  }
};
export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
    const result = await res.json();

    return result;
  } catch (error) {
    console.log("There is an error while fetching the data", error);
  }
};
