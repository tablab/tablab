import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const pmarsceill = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'patrick.marsceill@gmail.com',
      username: 'pmarsceill',
      profile: {
        create: {
          location: 'Claverack, NY',
        },
      },
      tabs: {
        create: {
          title: 'My first tab',
          artist: {
            create: {
              artist: {
                create: {
                  name: 'Patrick Marsceill',
                },
              },
            },
          },
          genres: {
            create: {
              genre: {
                create: {
                  name: 'Warm-up',
                },
              },
            },
          },
          content:
            'tabstave notation=true key=A time=4/4\nnotes :q =|: (5/2.5/3.7/4) :8 7-5h6/3 ^3^ 5h6-7/5 ^3^ :q 7V/4 |\nnotes :8 t12p7/4 s5s3/4 :8 3s:16:5-7/5 :q p5/4 text :w, |#segno, ,|, :hd, , #tr',
          published: true,
        },
      },
    },
  })
  console.log(pmarsceill)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
