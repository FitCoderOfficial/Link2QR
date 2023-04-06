import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} 프로필</span>
      </h1>
      <p className='desc text-left'>개인 프로필 페이지에 오신 것을 환영합니다.<br />자신의 생활 루틴과 신체 정보에 따라 맞춤형 운동 프로그램과 식단을 제공받으세요.</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;