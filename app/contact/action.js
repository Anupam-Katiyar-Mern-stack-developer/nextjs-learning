"use server";

export async function submitContact(formData){
    const name =formData.get("name");
    const email = formData.get("email");

    if(!name.trim() || !email.trim()){
        return Response.json({
            succes:false,
        });
    }

    console.log({name,email});
}