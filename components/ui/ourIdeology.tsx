"use client"

import { Shield, Users, Landmark, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import router from "next/router"

export function OurIdeology() {
  const principles = [
    {
      icon: Shield,
      title: "SHIKANA - Unity",
      subtitle: "National Consciousness",
      description:
        "Our core commitment to transcend ethnic, political, and social divisions, building a stronger nation united through National Identity, National Autonomy, National Pride, and National Unity.",
    },
    {
      icon: Users,
      title: "Patriotism",
      subtitle: "Service to Kenya",
      description:
        "Unwavering loyalty to the Republic of Kenya, prioritizing the unity of all citizens and their collective good over narrow sectional interests.",
    },
    {
      icon: Landmark,
      title: "Strong Institutions",
      subtitle: "Robust Frameworks",
      description:
        "Effective leadership at the core of building robust institutional frameworks and systems that serve all citizens equitably.",
    },
    {
      icon: Zap,
      title: "Collective Progress",
      subtitle: "Shared Prosperity",
      description:
        "Equitable distribution of resources and mutual respect, creating a harmonious society built on shared values and sustainable development.",
    },
  ]

  return (
    <section className="py-8 md:py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">What We Believe</h2>
          <p className="text-lg text-muted-foreground">
            Our Ideology defines everything we believe
          </p>
        </div>

        {/* Main Ideology Statement */}
        <div className="space-y-4 max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg leading-relaxed text-foreground/80">
            As a core national value enshrined in our Constitution of Kenya, SHIKANA represents the deliberate
            commitment to transcend ethnic, political, and social divisions to work together as one nation in search for
            our Nation's Consciousness – manifested through National Identity, National Autonomy, National Pride, and
            National Unity.
          </p>
        </div>

        {/* Four Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon
            return (
              <div
                key={index}
                className="text-center bg-muted p-6 transition-shadow rounded-lg border border-border"
              >
                <div className="inline-block p-4 bg-secondary/10 rounded-full mb-4">
                  <Icon size={32} className="text-secondary" />
                </div>

                <h3 className="text-xl font-bold text-primary mb-1">{principle.title}</h3>
                <p className="text-sm font-semibold text-secondary mb-3">{principle.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{principle.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="w-full py-10 md:py-16">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-3">
          Join Us
        </h2>

        {/* Intro statement */}
        <p className="text-lg md:text-xl leading-relaxed text-foreground/80 text-center max-w-3xl mx-auto mb-8">
          There are multiple ways to get involved with <span className="font-semibold text-primary">SHIKANA FRONTLINERS FOR UNITY PARTY</span>
          and contribute to our mission. 
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <li className="flex items-start gap-1">
            <span className="text-secondary font-bold mt-1">✓</span>
            <Link
              href="/shared-ui/register"
              className="text-foreground/80 hover:text-primary hover:underline transition-colors"
            >
              Become a Member
            </Link>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-secondary font-bold mt-1">✓</span>
            <Link
              href="/shared-ui/volunteer"
              className="text-foreground/80 hover:text-primary hover:underline transition-colors"
            >
              Volunteer In Party Activities
            </Link>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-secondary font-bold mt-1">✓</span>
            <Link
              href="/shared-ui/careers"
              className="text-foreground/80 hover:text-primary hover:underline transition-colors"
            >
              Become a Staff
            </Link>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-secondary font-bold mt-1">✓</span>
            <Link
              href="/shared-ui/political-position"
              className="text-foreground/80 hover:text-primary hover:underline transition-colors"
            >
              Political Aspirant
            </Link>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-secondary font-bold mt-1">✓</span>
            <Link
              href="/shared-ui/listings"
              className="text-foreground/80 hover:text-primary hover:underline transition-colors"
            >
              Shop Merchandise
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}















// "use client"

// import { Shield, Users, Landmark, Zap } from "lucide-react"

// export function OurIdeology() {
//   const principles = [
//     {
//       icon: Shield,
//       title: "SHIKANA - Unity",
//       subtitle: "National Consciousness",
//       description:
//         "Our core commitment to transcend ethnic, political, and social divisions, building a stronger nation united through National Identity, National Autonomy, National Pride, and National Unity.",
//     },
//     {
//       icon: Users,
//       title: "Patriotism",
//       subtitle: "Service to Kenya",
//       description:
//         "Unwavering loyalty to the Republic of Kenya, prioritizing the unity of all citizens and their collective good over narrow sectional interests.",
//     },
//     {
//       icon: Landmark,
//       title: "Strong Institutions",
//       subtitle: "Robust Frameworks",
//       description:
//         "Effective leadership at the core of building robust institutional frameworks and systems that serve all citizens equitably.",
//     },
//     {
//       icon: Zap,
//       title: "Collective Progress",
//       subtitle: "Shared Prosperity",
//       description:
//         "Equitable distribution of resources and mutual respect, creating a harmonious society built on shared values and sustainable development.",
//     },
//   ]

//   return (
//     <section className="w-full py-8 md:py-12 px-4 bg-white">
//       <div className="mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">What We Believe</h2>
//           <p className="text-lg text-muted-foreground">Our Ideology defines everything we believe</p>
//         </div>

//         {/* Main Ideology Statement */}
//         <div className="space-y-4 max-w-4xl mx-auto text-center">
//           <p className="text-lg leading-relaxed text-foreground/80">
//             As a core national value enshrined in our Constitution of Kenya, SHIKANA represents the deliberate
//             commitment to transcend ethnic, political, and social divisions to work together as one nation in search for
//             our Nation's Consciousness – manifested through National Identity, National Autonomy, National Pride and
//             National Unity.
//           </p>

//           {/* <p className="text-lg leading-relaxed text-foreground/80">
//             Patriotism and Loyalty to the Republic of Kenya holds the view that for us to progress and realize our
//             aspirations, effective leadership should be at the core of building robust institutional frameworks and
//             systems. As a party we prioritize the unity of all Kenyans and their collective good over narrow sectional
//             interests, regardless of their background. This principle underpins the country's aspiration for a
//             harmonious, equitable society built on mutual respect, shared values, and the equitable distribution of
//             resources.
//           </p> */}
//         </div>


//         {/* Four Pillars */}
//         {/* Four Pillars */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 md:mb-28">
//           {principles.map((principle, index) => {
//             const Icon = principle.icon
//             return (
//               <div
//                 key={index}
//                 className="group relative bg-white border border-border rounded-xl p-8 hover:border-secondary hover:shadow-lg transition-all duration-300"
//               >
//                 <div className="bg-gradient-to-br from-secondary/10 to-primary/10 p-4 rounded-lg mb-6 w-fit group-hover:from-secondary/20 group-hover:to-primary/20 transition-all">
//                   <Icon size={28} className="text-secondary" />
//                 </div>

//                 <h3 className="text-xl font-bold text-foreground mb-2">{principle.title}</h3>
//                 <p className="text-sm font-semibold text-secondary mb-4">{principle.subtitle}</p>
//                 <p className="text-foreground/70 leading-relaxed text-sm">{principle.description}</p>

//                 <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary to-primary rounded-b-xl w-0 group-hover:w-full transition-all duration-300"></div>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }
