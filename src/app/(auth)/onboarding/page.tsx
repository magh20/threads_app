import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function onBoarding() {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(userInfo?.onboarded) redirect("/");

    const userData = {
        id: user?.id, 
        objectId: userInfo?._id, 
        username: userInfo?.username || user?.username, 
        name:  userInfo?.name || user?.firstName || "",
        bio: userInfo?.bio || "",
        image: userInfo?.image || user?.imageUrl 
    };

    return(
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className=" head-text">onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">Complite your profile now to use Threads</p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle={"continue"} />
            </section>
        </main>
    )
}
export default onBoarding;