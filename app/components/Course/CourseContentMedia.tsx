import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatarIcon from "../../../public/Image/avatar.jpg";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerified, VscVerifiedFilled } from "react-icons/vsc";
import { Rating } from "@mui/material";
type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  // console.log("reaced in media");

  const [activeBar, setActiveBar] = useState(0);
  const [comment, setComment] = useState("");
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  // console.log("data in courseContentMedia",data);
  const isPrevDisabled = activeVideo === 0;
  const isNextDisabled = activeVideo === data.length - 1;

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});

  const [
    addReviewInCourse,
    { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewLoading },
  ] = useAddReviewInCourseMutation();

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const course = courseData?.course;

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const handleAnswerSubmit = () => {
    // console.log({answer,courseId:id,contentId:data[activeVideo]._id,questionId:questionId})
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
    // console.log("handleAnwerSubmit");
  };

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      console.log({ question, courseId: id, contentId: data[activeVideo]._id });
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
    }

    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added Successfully");
    }

    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error.data as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewSuccess) {
      setReview("");
      setRating(1);
      refetch();
      toast.success("Review added successfully");
      courseRefetch();
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }

    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerError,
    answerSuccess,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      addReviewInCourse({ review, rating, courseId: id, reviewId });
    }
  };

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleReviewReplySubmit = () => {
    if (replyCreationLoading) {
      return;
    }

    if (reply === "") {
      toast.error("Reply cannot be empty");
      return;
    }
    addReplyInReview({ comment: reply, courseId: id, reviewId });

    setIsReviewReply(false);
  };

  return (
    <div className="w-[95%] 800px:w-[86%] py-6 m-auto dark:text-white text-black h-screen ">
      {data && (
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
      )}
      <div className="w-full flex items-center justify-between my-3">
        <button
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            isPrevDisabled && "cursor-not-allowed opacity-50"
          }`}
          onClick={() => !isPrevDisabled && setActiveVideo(activeVideo - 1)}
          disabled={isPrevDisabled}
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </button>

        <button
          className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            isNextDisabled && "cursor-not-allowed opacity-50"
          }`}
          onClick={() => !isNextDisabled && setActiveVideo(activeVideo + 1)}
          disabled={isNextDisabled}
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </button>
      </div>

      <br />
      <h1 className="text-[25px] font-[600] !min-h-[40px] dark:bg-black mt-[10px] text-center">
        {data && data[activeVideo].title}
      </h1>
      <br />

      <div className="w-full p-4 flex items-center justify-between dark:bg-slate-900 bg-gray-200 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner text-black dark:text-white">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px] cursor-pointer  ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />

      <div className="dark:bg-slate-900 bg-gray-200 min-h-[200px]">
        {activeBar === 0 && (
          <p className="text-[18px] whitespace-pre-line mb-3 ml-2 ">
            {data && data[activeVideo]?.description}
            <br />
            <br />
          </p>
        )}

        {activeBar === 1 && (
          <div className="min-h-20">
            {data &&
              data[activeVideo]?.links.map((item: any, index: number) => (
                <div className="mb-5 dark:text-white text-black" key={index}>
                  <h2 className="800px:text-[20px] 800px:inline-block">
                    {item.title && item.title + " :"}
                    {item.url && item.url}
                  </h2>
                  <br />
                  <br />
                </div>
              ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={user?.avatar ? user.avatar : avatarIcon}
                alt="Profile Image"
                width={30}
                height={30}
                className="rounded-full w-[45px] h-[45px] "
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your question..."
                className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-black 800px:w-full  p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              />
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                  questionCreationLoading && "cursor-not-allowed"
                } `}
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b] ">
              <div>
                <CommentReply
                  data={data}
                  activeVideo={activeVideo}
                  answer={answer}
                  setAnswer={setAnswer}
                  handleAnswerSubmit={handleAnswerSubmit}
                  user={user}
                  answerCreationLoading={answerCreationLoading}
                  setQuestionId={setQuestionId}
                  questionId={questionId}
                />
              </div>
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={user?.avatar ? user.avatar : avatarIcon}
                      alt="Profile Image"
                      width={30}
                      height={30}
                      className="rounded-full w-[45px] h-[45px] object-cover "
                    />

                    <div className="w-full">
                      <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                        Give a Rating <span className="text-red-500"> *</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              color="yellow"
                              className="mr-1 cursor-pointer"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write your comment...."
                        className="outline-none bg-transparent 800px:ml-3 dark:text-white text-black border
                      border-[black] dark:border-[white] w-[95%]   "
                      />
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`{${
                        styles.button
                      } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2} ${
                        reviewLoading ? "cursor-no-drop" : ""
                      } `}
                      onClick={reviewLoading ? () => {} : handleReviewSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
              <br />
              <div className="w-full h-[1px] bg-[#ffffff3b] "></div>
              <div className="w-full">
                {(course?.reviews && [...course.reviews].reverse())?.map(
                  (item: any, index: number) => (
                    <div className="w-full my-5 dark:text-white text-black" key={index}>
                      <div className="w-full flex">
                        <div>
                          <Image
                            src={
                              item.user?.avatar ? item.user.avatar : avatarIcon
                            }
                            alt="Profile Image"
                            width={30}
                            height={30}
                            className="rounded-full w-[45px] h-[45px] "
                          />
                        </div>
                        <div className="ml-2">
                          <h1 className="text-[18px] ">{item?.user.name}</h1>
                          <Rating
                            value={item.rating}
                            readOnly
                            name="user rating"
                          />
                          <p>{item.comment}</p>
                          <small className="dark:text-[#ffffff83] text-[black]">
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" && (
                        <span
                          className={`${styles.label} !ml-5 cursor-pointer `}
                          onClick={() => {
                            setIsReviewReply(!isReviewReply);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply
                          {/* <BiMessage size={20} className="cursor-pointer" fill="#ffffff83"/> */}
                        </span>
                      )}
                      {isReviewReply && (
                        <div className="w-full flex relative">
                          <input
                            type="text"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Reply to customer review"
                            className={`${styles.input} !border-[0px] rounded-none !border-b dark:border-[white] border-[black] w-[90%] `}
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1"
                            onClick={handleReviewReplySubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}

                      {item.commentReplies.map((i: any, index: number) => (
                        <div className="w-full flex  800px:ml-16 my-5" key={index}>
                          <div>
                            <Image
                              src={i.user?.avatar ? i.user.avatar : avatarIcon}
                              alt="Profile Image"
                              width={30}
                              height={30}
                              className="rounded-full w-[45px] h-[45px] "
                            />
                          </div>

                          <div className="pl-3 ">
                            <div className="flex items-center">
                              <h5 className="text-[20px]">{item.user.name}</h5>
                              {i.user.role === "admin" && (
                                <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px] " />
                              )}
                            </div>
                            <p>{i.comment}</p>
                            <small className="dark:text-[#ffffff83] text-black ">
                              {format(i?.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </>
          </div>
        )}

        {/* <br />
      <br />
      <br />
      <br />
      <br /> */}
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
  questionId,
}: any) => {
  return (
    <>
      <div className="w-full">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
            questionId={questionId}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
  questionId,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  return (
    <>
      <div className="my-4 dark:bg-slate-900 bg-gray-200 p-[10px] ">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px]">
      <div className="w-[50px] h-[50px] bg-slate-600  rounded-[500px] flex items-center justify-center cursor-pointer">
        <h1 className="uppercase text-[18px]">
          {item?.user.name.slice(0,2)}
        </h1>
      </div>
      </div> */}

          <div>
            <Image
              src={item.user?.avatar ? item.user.avatar : avatarIcon}
              alt="Profile Image"
              width={30}
              height={30}
              className="rounded-full w-[45px] h-[45px] "
            />
          </div>

          <div className="pl-3 ">
            <h5 className="text-[20px  dark:text-white text-black">
              {item?.user.name}
            </h5>
            <p>{item.question}</p>
            <small className="dark:text-[#ffffff83] text-black ">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2 "
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All replies"
                : "Add reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-black "
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-black ">
            {item.commentReplies?.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((eachItem: any, index: any) => {
              return (
                <div
                  className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                  key={index}
                >
                  <div>
                    <Image
                      src={
                        eachItem.user?.avatar
                          ? eachItem.user.avatar
                          : avatarIcon
                      }
                      alt="Profile Image"
                      width={30}
                      height={30}
                      className="rounded-full w-[45px] h-[45px] "
                    />
                  </div>

                  <div className="pl-2">
                    <div className="flex items-center">
                      <h5 className="text-[20px]">{item.user.name}</h5>
                      {eachItem.user.role === "admin" && (
                        <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px] " />
                      )}
                    </div>
                    <p>{eachItem.answer}</p>
                    <small className="text-[#ffffff83]">
                      {format(item.createdAt)}
                    </small>
                  </div>
                </div>
              );
            })}
            <>
              {
                // console.log("item",item)
              }
              <div className="w-full flex  justify-end relative dark:text-white text-black">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className="block 800px:ml-12 mt-2 outline-none bg-transparent dark:text-white text-black border-b border-black dark:border-white px-[5px] w-[95%] "
                />
                <button
                  type="submit"
                  className={`absolute  rigth-0 bottom-1 bg-blue-500 p-1 rounded  ${
                    answer === "" || answerCreationLoading
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
