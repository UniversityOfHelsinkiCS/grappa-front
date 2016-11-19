import moment from "moment";

export const triggerDownload = store => next => action => {
  next(action);
  if (action.type === "THESIS_DOWNLOAD_SUCCESS") {
    // console.log("downloading")
    const blob = new Blob([action.payload], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `theses-${moment(new Date()).format("DD/MM/YYYY")}.pdf`;
    a.target = "_blank";
    a.click();
  }
};
