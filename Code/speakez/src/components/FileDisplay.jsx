import React from "react";
import { useState } from "react";

export default function FileDisplay() {
  const [file, setFile] = useState(null);
  return (
    <div>
      test
      <div id="drop-area" className="uploadbox">
        <p>
          Drag and drop or{" "}
          <label>
            upload
            <input
              onChange={(event) => {
                /*take first index*/
                const tempFile = event.target.files[0];
                setFile(tempFile);
              }}
              className="hidden"
              type="file"
              accept=".mp3, .wave"
            />
          </label>{" "}
          your files
        </p>

        <p>{file.name}</p>
      </div>
    </div>
  );
}
