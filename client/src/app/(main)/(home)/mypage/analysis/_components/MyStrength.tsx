'use client';

export default function MyStrength({ abilities }: { abilities: number[][] }) {
  const avg: number[] = abilities[0] ?? [];
  const diff: number[] = abilities[1]?.map((n, idx) => n - avg[idx]) ?? [];

  if (!avg.length)
    return (
      <div className='flex flex-col items-center justify-center h-5/6'>
        <div className='pb-3'>분석 데이터가 부족합니다.</div>
        <div>
          <span className='text-ourTheme font-semibold pb-1'>오늘의 학습</span>을 통해
        </div>
        <div>나의 강점&약점을 파악해보세요.</div>
      </div>
    );

  return (
    <>
      {diff[0] >= 0 ? (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C185 37.5 222.5 73.75 225 121.25L248.75 152.5C251.25 156.25 248.75 162.5 243.75 162.5H225V200C225 213.75 213.75 225 200 225H187.5V262.5H100V203.75C69.9999 190 50 160 50 125C50 76.25 88.7499 37.5 137.5 37.5ZM125 187.5H150V162.5H125V175M125 137.5H150V62.5H125V137.5Z'
                fill='#51D0A2'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourGreen'>사실적 읽기</span> 능력이 좋아요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourGreen'>{diff[0].toFixed(1)}점</span> 높아요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C185 37.5 222.5 73.75 225 121.25L248.75 152.5C251.25 156.25 248.75 162.5 243.75 162.5H225V200C225 213.75 213.75 225 200 225H187.5V262.5H100V203.75C69.9999 190 50 160 50 125C50 76.25 88.7499 37.5 137.5 37.5ZM125 187.5H150V162.5H125V175M125 137.5H150V62.5H125V137.5Z'
                fill='#FF8A8C'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourRed'>사실적 읽기</span> 능력이 약간 아쉬워요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourRed'>{Math.abs(diff[0]).toFixed(1)}점</span> 낮아요
            </div>
          </div>
        </div>
      )}
      {diff[1] >= 0 ? (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 107.25C127.75 107.25 119.5 114.875 119.5 125C119.5 135.125 127.75 143 137.5 143C147.25 143 155.25 134.75 155.25 125C155.25 115.25 147.625 107.25 137.5 107.25ZM137.5 37.5C89.0001 37.5 50.0001 76.75 50.0001 125C50.0001 160 70.3751 189.875 100 203.875V262.5H187.5V225H200C213.875 225 225 213.875 225 200V162.5H243.75C249 162.5 252 156.25 249 152.375L225 120.75C223.899 98.2912 214.197 77.1174 197.907 61.6181C181.616 46.1188 159.986 37.4827 137.5 37.5ZM100 125C100 123 100 121.875 100.75 120.125L89.6251 111.875C89.0001 111.375 88.5001 109.625 89.0001 108.375L99.0001 91.375C99.6251 90.25 101.375 89.625 102.5 90.25L114.875 95.5C117.125 93.125 120.125 91.375 123 90.25L125 77.375C125.375 75.625 126 75 127.75 75H147.625C148.875 75 150 75.625 150 77.375L151.75 90.25C154.625 91.375 157.625 93.125 160 95.5L172.875 90.25C174 89.625 175 90.25 175.75 91.375L185.75 108.375C186.375 110.125 186.375 111.375 185.125 111.875L174.625 120.125C174.625 121.875 175 123.625 175 125C175 126.625 174.625 128.375 174.625 130.125L185.125 138.25C186.375 138.875 186.375 140 185.75 141.25L175.75 158.75C175 160 174 160 172.875 160L160.5 154.625C157.625 157 155.25 158.25 151.75 159.375L150 172.875C150 174 148.875 175 147.625 175H127.75C126 175 125.375 174 125 172.875L123 159.375C120.125 158.25 117.125 157 114.875 154.75L102.5 160C101.375 160 99.6251 160 99.0001 158.75L89.0001 141.25C88.5001 140 89.0001 138.875 89.6251 138.25L100 130.125V125Z'
                fill='#51D0A2'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourGreen'>추론 능력</span>이 뛰어나시네요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourGreen'>{diff[1].toFixed(1)}점</span> 높아요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 107.25C127.75 107.25 119.5 114.875 119.5 125C119.5 135.125 127.75 143 137.5 143C147.25 143 155.25 134.75 155.25 125C155.25 115.25 147.625 107.25 137.5 107.25ZM137.5 37.5C89.0001 37.5 50.0001 76.75 50.0001 125C50.0001 160 70.3751 189.875 100 203.875V262.5H187.5V225H200C213.875 225 225 213.875 225 200V162.5H243.75C249 162.5 252 156.25 249 152.375L225 120.75C223.899 98.2912 214.197 77.1174 197.907 61.6181C181.616 46.1188 159.986 37.4827 137.5 37.5ZM100 125C100 123 100 121.875 100.75 120.125L89.6251 111.875C89.0001 111.375 88.5001 109.625 89.0001 108.375L99.0001 91.375C99.6251 90.25 101.375 89.625 102.5 90.25L114.875 95.5C117.125 93.125 120.125 91.375 123 90.25L125 77.375C125.375 75.625 126 75 127.75 75H147.625C148.875 75 150 75.625 150 77.375L151.75 90.25C154.625 91.375 157.625 93.125 160 95.5L172.875 90.25C174 89.625 175 90.25 175.75 91.375L185.75 108.375C186.375 110.125 186.375 111.375 185.125 111.875L174.625 120.125C174.625 121.875 175 123.625 175 125C175 126.625 174.625 128.375 174.625 130.125L185.125 138.25C186.375 138.875 186.375 140 185.75 141.25L175.75 158.75C175 160 174 160 172.875 160L160.5 154.625C157.625 157 155.25 158.25 151.75 159.375L150 172.875C150 174 148.875 175 147.625 175H127.75C126 175 125.375 174 125 172.875L123 159.375C120.125 158.25 117.125 157 114.875 154.75L102.5 160C101.375 160 99.6251 160 99.0001 158.75L89.0001 141.25C88.5001 140 89.0001 138.875 89.6251 138.25L100 130.125V125Z'
                fill='#FF8A8C'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourRed'>추론 능력</span>이 약간 부족해요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourRed'>{Math.abs(diff[1]).toFixed(1)}점</span> 낮아요
            </div>
          </div>
        </div>
      )}
      {diff[2] >= 0 ? (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C185 37.5 222.5 73.75 225 121.25L248.75 152.5C251.25 156.25 248.75 162.5 243.75 162.5H225V200C225 213.75 213.75 225 200 225H187.5V262.5H100V203.75C69.9999 190 50 160 50 125C50 76.25 88.7499 37.5 137.5 37.5ZM87.5 125H125V162.5H150V125H187.5V100H150V62.5H125V100H87.5V125Z'
                fill='#51D0A2'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourGreen'>어휘</span> 능력이 좋아요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourGreen'>{diff[2].toFixed(1)}점</span> 높아요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C185 37.5 222.5 73.75 225 121.25L248.75 152.5C251.25 156.25 248.75 162.5 243.75 162.5H225V200C225 213.75 213.75 225 200 225H187.5V262.5H100V203.75C69.9999 190 50 160 50 125C50 76.25 88.7499 37.5 137.5 37.5ZM87.5 125H125V162.5H150V125H187.5V100H150V62.5H125V100H87.5V125Z'
                fill='#FF8A8C'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourRed'>어휘</span> 능력이 약간 아쉬워요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourRed'>{Math.abs(diff[2]).toFixed(1)}점</span> 낮아요
            </div>
          </div>
        </div>
      )}
      {diff[3] >= 0 ? (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C184.625 37.5 222.625 74.375 225 120.75L249 152.375C252 156.25 249 162.5 243.75 162.5H225V200C225 213.875 213.875 225 200 225H187.5V262.5H100V203.875C70.3751 189.875 50.0001 160 50.0001 125C50.0001 76.75 89.0001 37.5 137.5 37.5ZM125 175H150V162.5H125V175ZM105 118.75C108.329 124.371 113.069 129.024 118.75 132.25V150H156.25V132.25C174.125 121.875 180.375 99 170 81.25C159.625 63.5 136.625 57 118.75 67.25C100.875 77.5 94.6251 100.625 105 118.75Z'
                fill='#51D0A2'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourGreen'>인지 능력</span>이 뛰어나시네요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourGreen'>{diff[3].toFixed(1)}점</span> 높아요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C184.625 37.5 222.625 74.375 225 120.75L249 152.375C252 156.25 249 162.5 243.75 162.5H225V200C225 213.875 213.875 225 200 225H187.5V262.5H100V203.875C70.3751 189.875 50.0001 160 50.0001 125C50.0001 76.75 89.0001 37.5 137.5 37.5ZM125 175H150V162.5H125V175ZM105 118.75C108.329 124.371 113.069 129.024 118.75 132.25V150H156.25V132.25C174.125 121.875 180.375 99 170 81.25C159.625 63.5 136.625 57 118.75 67.25C100.875 77.5 94.6251 100.625 105 118.75Z'
                fill='#FF8A8C'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourRed'>인지 능력</span>이 약간 부족해요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourRed'>{Math.abs(diff[3]).toFixed(1)}점</span> 낮아요
            </div>
          </div>
        </div>
      )}
      {diff[4] >= 0 ? (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C184.625 37.5 222.625 74.375 225 120.75L249 152.375C252 156.25 249 162.5 243.75 162.5H225V200C225 213.875 213.875 225 200 225H187.5V262.5H100V203.875C70.375 189.875 50 160 50 125C50 76.75 89 37.5 137.5 37.5ZM86.75 119.625L111.25 126.125L93.25 144.25C91.1508 146.358 89.9723 149.212 89.9723 152.188C89.9723 155.163 91.1508 158.017 93.25 160.125C95.3583 162.224 98.2123 163.403 101.187 163.403C104.163 163.403 107.017 162.224 109.125 160.125L127.375 142.125L133.75 166.625C135.25 172.75 141.5 176.25 147.375 174.625C148.812 174.262 150.162 173.616 151.345 172.725C152.529 171.833 153.523 170.714 154.268 169.433C155.013 168.152 155.495 166.735 155.685 165.266C155.875 163.796 155.77 162.303 155.375 160.875L148.75 136.25L173.375 142.875C174.803 143.275 176.298 143.384 177.769 143.197C179.24 143.009 180.659 142.528 181.941 141.782C183.223 141.036 184.343 140.04 185.233 138.854C186.124 137.667 186.767 136.314 187.125 134.875C188.75 129 185.25 122.75 179.125 121.25L154.625 114.875L172.625 96.625C174.506 94.4772 175.499 91.6947 175.405 88.8415C175.31 85.9883 174.134 83.2778 172.116 81.2592C170.097 79.2406 167.387 78.0649 164.533 77.9703C161.68 77.8758 158.898 78.8694 156.75 80.75L138.625 98.75L132.125 74.25C131.774 72.8451 131.15 71.5233 130.287 70.3603C129.425 69.1973 128.341 68.216 127.099 67.4727C125.856 66.7295 124.479 66.2389 123.046 66.029C121.614 65.8192 120.154 65.8943 118.75 66.25C112.5 67.875 109 74 110.5 80.125L117.125 104.625L92.625 98C91.1721 97.6253 89.6595 97.5416 88.1741 97.754C86.6888 97.9663 85.2601 98.4704 83.9705 99.2373C82.6808 100.004 81.5556 101.019 80.6596 102.222C79.7636 103.426 79.1146 104.795 78.75 106.25C78.3943 107.654 78.3192 109.114 78.529 110.546C78.7389 111.979 79.2295 113.356 79.9727 114.599C80.716 115.841 81.6972 116.925 82.8602 117.787C84.0233 118.65 85.3451 119.274 86.75 119.625Z'
                fill='#51D0A2'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourGreen'>읽기 속도</span>가 빨라요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourGreen'>{diff[4].toFixed(1)}점</span> 높아요
            </div>
          </div>
        </div>
      ) : (
        <div className='flex mb-8'>
          <div className='w-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 300 300'
              fill='none'
            >
              <path
                d='M137.5 37.5C184.625 37.5 222.625 74.375 225 120.75L249 152.375C252 156.25 249 162.5 243.75 162.5H225V200C225 213.875 213.875 225 200 225H187.5V262.5H100V203.875C70.375 189.875 50 160 50 125C50 76.75 89 37.5 137.5 37.5ZM86.75 119.625L111.25 126.125L93.25 144.25C91.1508 146.358 89.9723 149.212 89.9723 152.188C89.9723 155.163 91.1508 158.017 93.25 160.125C95.3583 162.224 98.2123 163.403 101.187 163.403C104.163 163.403 107.017 162.224 109.125 160.125L127.375 142.125L133.75 166.625C135.25 172.75 141.5 176.25 147.375 174.625C148.812 174.262 150.162 173.616 151.345 172.725C152.529 171.833 153.523 170.714 154.268 169.433C155.013 168.152 155.495 166.735 155.685 165.266C155.875 163.796 155.77 162.303 155.375 160.875L148.75 136.25L173.375 142.875C174.803 143.275 176.298 143.384 177.769 143.197C179.24 143.009 180.659 142.528 181.941 141.782C183.223 141.036 184.343 140.04 185.233 138.854C186.124 137.667 186.767 136.314 187.125 134.875C188.75 129 185.25 122.75 179.125 121.25L154.625 114.875L172.625 96.625C174.506 94.4772 175.499 91.6947 175.405 88.8415C175.31 85.9883 174.134 83.2778 172.116 81.2592C170.097 79.2406 167.387 78.0649 164.533 77.9703C161.68 77.8758 158.898 78.8694 156.75 80.75L138.625 98.75L132.125 74.25C131.774 72.8451 131.15 71.5233 130.287 70.3603C129.425 69.1973 128.341 68.216 127.099 67.4727C125.856 66.7295 124.479 66.2389 123.046 66.029C121.614 65.8192 120.154 65.8943 118.75 66.25C112.5 67.875 109 74 110.5 80.125L117.125 104.625L92.625 98C91.1721 97.6253 89.6595 97.5416 88.1741 97.754C86.6888 97.9663 85.2601 98.4704 83.9705 99.2373C82.6808 100.004 81.5556 101.019 80.6596 102.222C79.7636 103.426 79.1146 104.795 78.75 106.25C78.3943 107.654 78.3192 109.114 78.529 110.546C78.7389 111.979 79.2295 113.356 79.9727 114.599C80.716 115.841 81.6972 116.925 82.8602 117.787C84.0233 118.65 85.3451 119.274 86.75 119.625Z'
                fill='#FF8A8C'
              />
            </svg>
          </div>
          <div className='ml-1'>
            <div className='text-lg font-bold'>
              <span className='text-ourRed'>읽기 속도</span>가 느려요
            </div>
            <div className='text-sm'>
              전체 평균 대비 <span className='text-ourRed'>{Math.abs(diff[4]).toFixed(1)}점</span> 낮아요
            </div>
          </div>
        </div>
      )}
    </>
  );
}
