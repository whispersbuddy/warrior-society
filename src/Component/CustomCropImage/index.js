import classes from './CustomCropImage.module.css'
const aspectRatio = 1 / 0.231;
const CustomCropImage = ({
  coverPhotoDimensions,
  defaultImageSelected,
  state,
  cropAspectRatio = aspectRatio,
  imgClass,
}) => {
  const scale = 100 / coverPhotoDimensions?.width;
  const transform = {
    x: `${-coverPhotoDimensions?.x * scale}%`,
    y: `${-coverPhotoDimensions?.y * scale}%`,
    scale: scale,
    width: "calc(100% + 0.5px)",
    height: defaultImageSelected ? "auto" : "100%",
  };

  const imageStyle = coverPhotoDimensions
    ? {
        transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        width: transform.width,
        height: transform.height,
      }
    : {};

  return (
    <div
      style={{ paddingBottom: `${100 / cropAspectRatio}%` }}
      className={classes.output}
    >
      <img
        src={typeof state === "object" ? URL.createObjectURL(state) : state}
        className={[classes.renderImg, imgClass && imgClass].join(" ")}
        style={imageStyle}
      />
    </div>
  );
};
export default CustomCropImage;
