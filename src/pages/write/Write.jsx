import { useRef, useState } from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import AutoTextarea from "../../components/AutoTextarea";
import PreviewDialog from "../../components/PreviewDialog";
import { useSelector } from "react-redux";

const Write = () => {  

  const writeContent = useSelector((state) => state.currentState.writeContent);
  const [content, setContent] = useState(writeContent ?? []);
  const [bookDetails, setBookDetails] = useState({
    name: "React Hooks",
    author: "Author Name",
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const imageInputRef = useRef(null);

  const handleChange = (index, value) => {
    let newContent = [...content];
    newContent[index].text = value;
    setContent(newContent);
    console.log(content);
  };

  const handleSelectButton = (type) => {
    let newContent = [...content];
    newContent.push({ type: type, text: "" });
    setContent(newContent);
  };

  const handleClose = () => {
    setPreviewOpen(false);
  };

  const removeContent = (index) => {
    let newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  const convertImage = (file, index) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleChange(index, reader.result )
      } else {
        console.error("Unsupported file format");
      }
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };

  const handleLabelClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  return (
    <div>
      <div className="w-full h-20 bg-background-500 flex"></div>
      <div className="md:w-1/6 px-2 fixed flex flex-col">
        {["Chapter", "Heading", "Subheading", "Paragraph", "Image"].map(
          (item, ind) => (
            <div
              key={ind}
              className="border-2 border-pink-600 rounded-lg m-2 cursor-pointer"
              onClick={() => handleSelectButton(item)}>
              <button className="cursor-pointer m-2">Add {item}</button>
            </div>
          )
        )}
      </div>
      <div className="flex w-full min-h-screen mt-2">
        <div className="md:w-1/6 px-2 flex flex-col"></div>
        <div className="w-full md:w-5/6 mx-2 my-2">
          <div className="w-full flex justify-end">
            <button
              className="bg-pink-500 mr-2 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => setPreviewOpen(true)}>
              Preview
            </button>
            <button
              className="bg-pink-500 mr-20 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full"
              disabled>
              Publish
            </button>
          </div>
          <div className="mx-auto max-w-screen-lg justify-center px-2 py-4">
            {content.map((item, index) => {
              if (item.type === "Image") {
                return (
                    <div key={index} className="w-[95%] mb-4 p-4 relative border border-cyan-500 rounded-md">
                      <div
                        className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                        onClick={() => removeContent(index)}>
                        <CancelPresentationIcon />
                      </div>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && convertImage(e.target.files[0], index)
                        }
                        style={{
                          display: "none",
                        }}
                      />
                      {item.text === "" && (
                        <label
                          onClick={handleLabelClick}
                          className="custom-file-input-label w-36 h-8 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                          htmlFor="customFile">
                          Choose file
                        </label>
                      )}
                      {item.text !== "" && (
                        <div className="relative">
                          <div style={{ display: "inline-block" }}>
                            <img
                              src={item.text}
                              alt="Uploaded"
                              style={{
                                width: "100px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            />
                          </div>
                          <button onClick={() => handleChange(index, "")}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                );
              } else {
                return (
                  <div key={index} className="w-[95%] mb-4 relative">
                    <div
                      className="flex justify-end absolute -top-1 -right-6 cursor-pointer"
                      onClick={() => removeContent(index)}>
                      <CancelPresentationIcon />
                    </div>
                    <AutoTextarea
                      item={item}
                      ind={index}
                      handleChange={handleChange}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      {previewOpen && (
        <PreviewDialog
          open={previewOpen}
          content={content}
          bookDetails={bookDetails}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default Write;
