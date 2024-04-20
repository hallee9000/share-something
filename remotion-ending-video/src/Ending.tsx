import { BookmarkSimple, ThumbsUp, UserPlus } from '@phosphor-icons/react';
import {spring} from 'remotion';
import {
	AbsoluteFill,
  Audio,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { Img, staticFile, continueRender, delayRender } from "remotion";

const waitForFont = delayRender();
const font = new FontFace(
  `DingTalkJinBuTi`,
  `url('${staticFile("DingTalk JinBuTi.ttf")}') format('truetype')`,
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
    continueRender(waitForFont);
  })
  .catch((err) => console.log("Error loading font", err));

export const Ending: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

  function down (durationInFrames: number) {
    const translationProgress = spring({
      frame,
      fps,
      durationInFrames,
      config: {
        damping: 100,
      },
    });

    return interpolate(
      translationProgress,
      [0, 1],
      [-1000, 0]
    );
  }

  function scale (delay: number) {
    return spring({
      frame: frame - delay,
      fps,
      durationInFrames: 12,
      config: {
        damping: 100,
      },
    });
  }

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 72,
        color: '#3649F7',
        fontFamily: 'DingTalkJinBuTi',
        background: 'radial-gradient(204.66% 115.91% at -1.25% -2.59%, #FFFFFF 0%, #FFFFFF 55.93%, #E8EAF8 100%)'
      }}
    >
      <Audio src={staticFile("ending.wav")} />
      <Sequence from={20}>
        <Audio src={staticFile("pop-up.mp3")} />
      </Sequence>
      <Sequence from={28}>
        <Audio src={staticFile("pop-up.mp3")} />
      </Sequence>
      <Sequence from={36}>
        <Audio src={staticFile("pop-up.mp3")} />
      </Sequence>
			<Img
        src={staticFile("curtain.png")}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1,
          transform: `translateY(${down(20)}px)`,
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          zIndex: 2
        }}
      >
        <Img
          src={staticFile("avatar.png")}
          style={{
            width: 352,
            transform: `translateY(${down(15)}px)`,
          }}
        />
        <h1
          style={{
            fontSize: 80,
            marginBottom: 100,
            transform: `translateY(${down(8)}px)`,
          }}
        >@哈尔哈哈哈</h1>
        <div style={{
          display: 'flex',
          gap: 72
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${scale(20)})`}}>
            <ThumbsUp size={72}/>
            点赞
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${scale(28)})`}}>
            <BookmarkSimple size={72}/>
            收藏
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, transform: `scale(${scale(36)})`}}>
            <UserPlus size={72}/>
            关注
          </div>
        </div>
      </div>
		</AbsoluteFill>
	);
};
