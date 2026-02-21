"use client";

export type OrkutProfileData = {
  name: string;
  status: string;
  about: string;
  avatar: string;
  friends: number;
  fans: number;
  visits: number;
  testimonials: { author: string; text: string }[];
  communities: string[];
};

const defaultData: OrkutProfileData = {
  name: "Visitante",
  status: "offline",
  about: "Este perfil ainda n\u00E3o foi personalizado.",
  avatar: "/orkut.png",
  friends: 0,
  fans: 0,
  visits: 0,
  testimonials: [],
  communities: [],
};

export default function OrkutProfileMobile({
  data = defaultData,
}: {
  data?: OrkutProfileData;
}) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-[#e5ecf9] text-[13px] font-orkut">
      <div className="bg-gradient-to-b from-[#4a6ea9] to-[#3b5998] px-3 py-2 font-bold text-white">
        orkut
      </div>

      <Box title={`Perfil de ${data.name}`}>
        <div className="flex gap-3">
          <img
            src={data.avatar}
            alt={`Avatar de ${data.name}`}
            className="h-[80px] w-[80px] border border-[#c3d9ff] bg-white p-[2px]"
          />

          <div>
            <div className="font-bold text-[#003399]">{data.name}</div>
            <div className="text-[12px] text-gray-600">{data.status}</div>

            <div className="mt-2 grid grid-cols-3 gap-4 text-center">
              <Stat label="amigos" value={data.friends} />
              <Stat label="fãs" value={data.fans} />
              <Stat label="visitas" value={data.visits} />
            </div>
          </div>
        </div>
      </Box>

      <Box title="quem sou eu">{data.about}</Box>

      <Box title={`depoimentos (${data.testimonials.length})`}>
        {data.testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </Box>

      <Box title={`comunidades (${data.communities.length})`}>
        {data.communities.map((community, index) => (
          <Community key={index} name={community} />
        ))}
      </Box>
    </div>

  );
}

function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="m-2 border border-[#c3d9ff] bg-white">
      <div className="border-b border-[#c3d9ff] bg-[#dfe8f6] px-3 py-1 font-bold text-[#003399]">
        {title}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-bold text-[#003399]">{value}</div>
      <div className="text-[11px] text-gray-600">{label}</div>
    </div>
  );
}

function Testimonial({ author, text }: { author: string; text: string }) {
  return (
    <div className="mb-2 border border-[#e0e7f5] bg-[#f7faff] p-2">
      <div className="text-[11px] text-gray-600">{author} escreveu:</div>
      <div>{text}</div>
    </div>
  );
}

function Community({ name }: { name: string }) {
  return <div className="text-[#003399]">- {name}</div>;
}