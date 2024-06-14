import ProgressBar from "@badrap/bar-of-progress";

const progress = new ProgressBar({
  size: 4,
  className: "bar-of-progress",
  color: "#000000",
  delay: 100
});

export function onStart() {
  progress.start();
}

export function onComplete() {
  progress.finish();
}
