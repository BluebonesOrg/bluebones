import img from '~/assets/wx_reward.png';
import { Icon } from '~/components/icon';
import { Slide } from '~/components/silde';
import { t } from '~/ts/util';

export default () => (
  <div>
    <Slide title={t('donate.title')} text={t('donate.text')}>
      <div class="aspect-square w-64">
        <Icon size={256} children={img}></Icon>
      </div>
    </Slide>
    <Slide title={t('donate.supporters.title')}>
      <>
        {t('donate.supporters.text')!
          .split('\n')
          .map((line) => {
            const [name, message, amount, date] = line.split('|');
            return (
              <div class="w-64 mb-4">
                <div class="font-bold flex justify-between">
                  <span>{name}</span>
                  <span>{amount}</span>
                </div>
                <div class="text-sm flex justify-between">
                  <span>{message}</span>
                  <span>{date}</span>
                </div>
              </div>
            );
          })}
      </>
    </Slide>
  </div>
);
